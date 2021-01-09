/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstaddend.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/25 04:04:23 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:51:18 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

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
