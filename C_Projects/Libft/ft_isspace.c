/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_isspace.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 17:49:36 by blaine            #+#    #+#             */
/*   Updated: 2019/10/29 12:06:37 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

int		ft_isspace(int i)
{
	if (i == ' ' || i == '\n' || i == '\t'
		|| i == '\v' || i == '\f' || i == '\r')
		return (1);
	else
		return (0);
}
