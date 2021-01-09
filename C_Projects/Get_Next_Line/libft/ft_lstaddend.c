/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstaddend.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/25 04:04:23 by blaine            #+#    #+#             */
/*   Updated: 2019/11/05 23:55:45 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "./includes/libft.h"

void	ft_lstaddend(t_list **alst, t_list *newblock)
{
	if (newblock)
	{
		if (!(*alst))
			(*alst) = newblock;
		while ((*alst)->next)
			(*alst) = (*alst)->next;
		(*alst)->next = newblock;
	}
}
