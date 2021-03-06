/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_striter.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 18:52:51 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:48:19 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_striter(char *s, void (*f)(char *))
{
	if (s)
	{
		while (*s)
			(f)(s++);
	}
}
